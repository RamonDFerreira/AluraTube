import config from '../../../config.json'
import { StyledHeader, StyledBanner } from "./styles";

export function Header() {
  return (
    <StyledHeader>
        <StyledBanner bg={config.bg} />
        <section className="user-info">
            <img src={`https://github.com/${config.github}.png`} />
            <div>
                <h2>
                    {config.name}
                </h2>
                <p>
                    {config.job}
                </p>
            </div>
        </section>
    </StyledHeader>
)
}