import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background-color: #010001;

    img{
        width: 150px;
        height: 150px;
        object-fit: cover;
    }

    form {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        margin-bottom: 18px;

        input {
            width: 80%;
            height: 40px;
            padding-left: 6px;
            margin-bottom: 12px;
            font-size: 18px;
        }

        button {
            width: 200px;
            height: 50px;
            border-radius: 50%;
            font-size: 20px;

            &:hover{
                cursor: pointer;
            }
        }
    }

    h2{
        color: #ffffff;
    }
`