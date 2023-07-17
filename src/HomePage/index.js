
import './homepage.scss'
import Introduce from './Introduce';
import Prologue from './Prologue';
import { Context } from "../UseContext/ThemeContext";
import { useContext } from 'react';

function HomePage({user}) {

    const [handle] = useContext(Context)
    handle.checkLogged()

    return (
        <div id='homepage'>
            <Prologue />
            <Introduce  />
        </div>
    );
}

export default HomePage;