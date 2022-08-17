import ReactDOM from 'react-dom';

const Portal = (Component) => (props) => {
    return ReactDOM.createPortal(
        <Component {...props} />,
        document.getElementById('modal')
    );
};

export default Portal;
