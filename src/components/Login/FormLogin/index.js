import { StyledLogin } from "./styles";
import { FcGoogle } from "react-icons/fc"

export default function FormLogin({handleGoogleSignIn}) {

  return (
    <StyledLogin>
      <div>
        <h1>Login</h1>
        <p>Conecte-se com o Google e crie suas playlists com seus vídeos favoritos.</p>
        <button onClick={handleGoogleSignIn}><FcGoogle size={24}/> Conectar com o Google</button>
      </div>
    </StyledLogin>
  )
}