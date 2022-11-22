import { useSession } from 'next-auth/react';
import config from '../../../config.json'
import { StyledHeader, StyledBanner } from "./styles";

export function Header() {
    const { data: session } = useSession()
    return (
        <StyledHeader>
            <StyledBanner bg={config.bg} />
            <section className="user-info">
                <img src={session.user.image} />
                <div>
                    <h2>
                        {session.user.name.toUpperCase()}
                    </h2>
                </div>
            </section>
        </StyledHeader>
    )
}