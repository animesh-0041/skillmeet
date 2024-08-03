import './style.scss';

export const Loading = ({ type }) => {

    switch (type) {
        case 'waiting':
            return (<span className="loader-waiting"></span>)
        case 'loading-modal':
            return (<span className="loading-modal"></span>)
        case 'loading-chat':
            return (<span className="loading-chat"></span>)
        default:
            return <span className="loader-deafult"></span>
    }
}