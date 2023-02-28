import React from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Confetti from 'react-confetti'
import { useMediaQuery } from 'react-responsive';

import Loader from '../components/loader';
import { ReactComponent as Logo } from '../assets/icons/logo_purple_shadow.svg';
import { ReactComponent as Globe } from '../assets/img/globe.svg';
import { validateUser } from '../api/auth';

const ValidationMessage = () => {
    const { token } = useParams();

    const navigate = useNavigate();

    const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });

    const { data, isLoading } = useQuery('validation', () => validateUser(token));

    if (isLoading) {
        return <Loader />;
    }

    if (data) {
        return (
            <div>
                <Confetti     
                    numberOfPieces={550}
                    recycle={false}
                    colors={['#CDB4FF', '#BFFFD6']} 
                />
                <div className="validation-page">
                    {isMobile ? <Logo width={"80%"} height={500} /> : <Logo width={1000} height={500} className="validation-page--logo" />}
                    <h1><span>&#x1F389;</span> Votre compte est validé ! <span>&#x1F389;</span></h1>
                    <p>Vous pouvez maintenant vous connecter à votre compte et commencer à jouer !</p>
                    {isMobile ? null : <Globe className='validation-page--globe' />}
                    <button onClick={() => navigate("/login")} className="button-purple">Se connecter</button>
                </div>
            </div>
        )
    }
};

export default ValidationMessage;