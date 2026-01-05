import React from 'react';
import { auth } from '../services/firebaseConnection';
import { onAuthStateChanged } from 'firebase/auth';
import { Navigate } from 'react-router';

// Interface para tipar as props do componente Private
// Ele recebe "children", que são os componentes protegidos
interface PrivateProps {
  children: React.ReactNode;
}

export function Private({ children }: PrivateProps): any {
  // Estado para controlar se ainda está verificando o login
  const [loading, setLoading] = React.useState(true);

  // Estado que indica se o usuário está logado ou não
  const [signed, setSigned] = React.useState(false);

  React.useEffect(() => {
    // Escuta mudanças no estado de autenticação do Firebase
    // Essa função é chamada sempre que o usuário loga ou desloga
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Se existir usuário, ele está autenticado
        const userData = {
          uid: user.uid,
          email: user.email,
        };

        // Salva dados básicos do usuário no localStorage
        localStorage.setItem('@reactlinks', JSON.stringify(userData));

        // Finaliza o carregamento e marca como logado
        setLoading(false);
        setSigned(true);
      } else {
        // Se não existir usuário, não está logado
        setLoading(false);
        setSigned(false);
      }
    });

    // ( remover o listener quando o componente desmontar
    return () => {
      unsub();
    };
  }, []);

  // Enquanto verifica se o usuário está logado, não renderiza nada
  if (loading) {
    return <div></div>;
  }

  // Se não estiver logado, redireciona para a página de login
  if (!signed) {
    return <Navigate to="/login" />;
  }

  // Se estiver logado, renderiza o conteúdo protegido
  return children;
}
