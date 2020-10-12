import styled from 'styled-components'

export const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`

export const Block = styled.div`
    width: 100%;
    border: 1px solid rgb(204, 204, 204);
    border-radius: 4px;
    padding: 0 0 20px 0;
    margin: 10px 10px 10px 10px;
`

export const Title = styled.div`
    height: 80px;
    width: 100%;
    padding: 30px 0 0 30px;
    font-size: 24px;
`

export const BlockContent = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Info = styled.div`
    height: 60px;
    width: 100%;
    font-size: 20px;
`