import styled from "styled-components";

interface Props {
    transfer: boolean,
    transactions: boolean
  }

export const Container = styled.div<Props>`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background-image: url(https://ng.cash/_nuxt/img/banner-landing-page.0bd7f55.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: relative;

    .balance {
        display: ${props => props.transactions ? 'none' : 'flex'};
        justify-content: center;
        align-items: center;
        width: 80%;
        max-width: 300px;
        height: 60px;
        background-color: #ffffff;
        border-radius: 6px;
        margin-bottom: 12px;

        h1{
            color: #000000;
            font-size: 26px;
            font-weight: bolder;
        }
    }

    .icon {
        position: absolute;
        top: 14px;
        right: 14px;

        &:hover {
            cursor: pointer;
        }
    }

    .buttons {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .transfer {
        display: ${props => props.transfer ? 'none' : props.transactions ? 'none' : 'flex'};
        justify-content: center;
        align-items: center;
        border: 1px solid #ffffff;
        background-color: #ffffff;
        width: 40%;
        max-width: 140px;
        height: 40px;
        border-radius: 6px;
        font-size: 16px;
        margin-right: 16px;

        box-shadow: rgba(229, 224, 224, 0.4) 5px 5px, rgba(167, 162, 162, 0.3) 10px 10px, rgba(205, 202, 202, 0.2) 15px 15px, rgba(0, 0, 0, 0.1) 20px 20px, rgba(0, 0, 0, 0.05) 25px 25px;

        &:hover {
            cursor: pointer;
        }
    }

    form {
        display: ${props => props.transfer ? 'flex' : 'none'};
        justify-content: center;
        align-items: center;
        flex-direction: column;

        input {
            width: 90%;
            height: 30px;
            margin-bottom: 12px;
            font-size: 20px;
        }
    }

    button {
            width: 100px;
            height: 50px;
            border-radius: 50%;
            background-color: #ffffff;
            font-size: 20px;
            font-weight: bolder;
            margin-bottom: 10px;
        }

    .cancel {
        display: ${props => props.transfer ? 'flex' : 'none'};
        justify-content: center;
        align-items: center;
    }

    h2{
        display: ${props => props.transactions ? 'none' : 'flex'};
        color: #ffffff;
        margin-bottom: 10px;
        transform: translateX(-80px);
    }

    .transactions {
        display: ${props => props.transactions ? 'flex' : 'none'};
        padding: 20px;
        width: 90%;
        height: 80vh;
        background-color: #ffffff;
        border: solid 4px #0093E9;
    }
`;

export const Transaction = styled.div`
    display: flex;

    h3 {
        display: flex;
        margin-right: 20px;

        h4{
            margin-left: 6px;
            color: green;
        }
    }
`