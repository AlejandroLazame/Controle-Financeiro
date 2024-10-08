import './styles/TotalCard.css';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleMinus, faCirclePlus, faWallet, IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface ITotalCard {
    key: string,
    title: string,
    data: number,
    iconName: 'wallet' | 'minus' | 'plus' 
}

const iconMapping: Record<ITotalCard['iconName'], IconDefinition> = {
    wallet: faWallet,
    minus: faCircleMinus,
    plus: faCirclePlus
}

const TotalCard: React.FC<ITotalCard> = ({title, data, iconName}) => {
    const icon = iconMapping[iconName] ?? faWallet;
    
    return (
        <li className='Card'>
            <article className='CardContent'>
                <section className='CardTitle'>
                    <h1>{ title }</h1>
                </section>
                <section className='CardText'>
                    <p className='Card-Value'>R$ { data.toFixed(2) }</p>
                </section>
            </article>
            <div className='CardIcon'>
                <FontAwesomeIcon icon={icon} size='2x'/>
            </div>
        </li>
    );
}

export default TotalCard