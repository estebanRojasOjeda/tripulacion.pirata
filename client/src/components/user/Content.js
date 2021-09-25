import Header from './Header';
import Register from './Register';
import Login from './Login';
import "./style/content.css";

const Content = () => {
    return (
        <div className="content">
            <Header></Header>
            <div className="register">
                <Register></Register>
            </div>
            <div className="login">
                <Login></Login>
            </div>

        </div>
    )
}

export default Content;