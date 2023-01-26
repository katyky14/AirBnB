
import { NavLink, useHistory } from 'react-router-dom';


import './notFound.css'


function NotFound() {

    const history = useHistory();

    return (
        <div className='page-not-found-container'>
            <div onClick={() => history.push('/')} className='page-not-found'>
                <h1 className='h1-not-found'>Click Here</h1>
            </div>
            {/* <NavLink to='/' >Return to Homepag</NavLink> */}
            <div>
                <img
                className='img-404-gif'
                src='https://media4.giphy.com/media/C21GGDOpKT6Z4VuXyn/giphy.gif?cid=ecf05e47rymqwimk77bxz3zrhglkai8tyb4kb7m70zss94s4&rid=giphy.gif&ct=g'></img>

            </div>


        </div>
    )
}

export default NotFound;
