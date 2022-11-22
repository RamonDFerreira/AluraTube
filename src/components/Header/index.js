import { useSession } from 'next-auth/react';
import config from '../../../config.json'
import { StyledHeader, StyledBanner } from "./styles";

export function Header() {
    const { data: session } = useSession()
    const fullName = session.user.name.split(" ")
    const nameCapitalized = () => {        
        return fullName.map((name) => {
            return name[0].toUpperCase() + name.substring(1);
        }
        ).join(' ') 
    }
    
    return (
        <StyledHeader>
            <StyledBanner bg={config.bg} />
            <section className="user-info">
                <img src={session.user.image} />
                <div>
                    <h2>
                        {nameCapitalized()}
                    </h2>
                </div>
            </section>
        </StyledHeader>
    )
}