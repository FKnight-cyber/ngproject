import { Container, Transaction } from "./style";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../contexts/userContext";
import { useState } from "react";
import { formatPrice } from "../../utils/formatPrice";
import { IoExit } from "react-icons/io5";
import CurrencyInput from 'react-currency-input-field';
import jwt from 'jwt-decode';

export default function InitialPage() {

    const [balance, setBalance] = useState(0);
    const [transfer, setTransfer] = useState(false);
    const [displayTransactions, setDisplayTransactions] = useState(false);
    const [receiver, setReceiver] = useState('');
    const [sendAmount, setSendAmount] = useState('0');
    const [allTransactions, setAllTransactions] = useState([]);

    const { token, setToken } = useContext(UserContext);

    const navigate = useNavigate();

    if(!token) {
        navigate('/');
    };

    useEffect(() => {
        const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/account/info`,{
            headers:{'x-access-token': `${token}`}
        });

        promise.then(res => {
            setBalance(res.data);
        });

        promise.catch(Error => {
            alert(Error.response.data);
        })
    },[balance]);

    function signOut() {
        localStorage.setItem('authToken', '');
        setToken('');
        navigate('/');
    };

    function sendTo(event:any) {
        event.preventDefault();

        const body = {
            username: receiver,
            value: Number(sendAmount)*100
        };

        const promise = axios.post(`${process.env.REACT_APP_API_BASE_URL}/transactions`,body,{
            headers:{'x-access-token': `${token}`}
        });

        promise.then((res) => {
            alert(res.data);
            setReceiver('');
            setSendAmount('0');
            setBalance(balance - Number(sendAmount)*100);
            setTransfer(!transfer);
        });

        promise.catch(Error => {
            alert(Error.response.data)
        });
    };

    function getAllTransactions() {
        const promise = axios.get(`${process.env.REACT_APP_API_BASE_URL}/my/transactions`,{
            headers:{'x-access-token': `${token}`}
        });

        promise.then(res => {
            setAllTransactions(res.data);
        });

        promise.catch(Error => {
            alert(Error.response.data);
        })
    };

    function renderAllTransactions(transactions:any) {
        const { data } : { data:any } = jwt(token);

        transactions.map((transaction:any, index:any) => 
        <Transaction key={index}>
            <h3>{transaction.debitedAccount === data.id ? 'Enviado para: ' : 'Recebido de: '}<h4>Fulano de tal</h4></h3>
            <h4>R$ 10,00</h4>
        </Transaction>)
    }

    return(
        <Container transfer={transfer} transactions={displayTransactions}>
            <h2>Your balance</h2>
            <div className="balance">
                <h1>{formatPrice(balance)}</h1>
            </div>
            <div className="buttons">
                <button 
                    className="transfer"
                    onClick={() => setTransfer(!transfer)}
                >
                    Transferir
                </button>
                <button 
                    className="transfer"
                    onClick={() => {
                        getAllTransactions();
                        setDisplayTransactions(!displayTransactions);
                    }}
                >
                    Transações
                </button>
            </div>
            <form onSubmit={sendTo}>
                <input 
                    type="text"
                    placeholder="Receiver" 
                    value={receiver}
                    required
                    onChange={e => setReceiver(e.target.value)} 
                />
                <CurrencyInput 
                    intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                    value={sendAmount}
                    onValueChange={(value) => setSendAmount(value)}
                />;
                <button type="submit">Send!</button>
            </form>
            <button className="cancel" onClick={() => setTransfer(!transfer)}>Cancel</button>
            <div className="transactions">

            </div>
            <IoExit 
                className="icon" 
                color="#ffffff" 
                size={40}
                onClick={signOut} 
            />
        </Container>
    )
};