export interface IGameState{
    gameStarted: boolean,
    deck: ICard[],
    computerCards: ICard[],
    humanCards: ICard[],
    computerScore: number,
    humanScore: number,
    error: string,
    isHumanMoved: boolean,
    isComputerMoved: boolean,
    winner: string,
    isComputerPass: boolean,
    isHumanPass: boolean
}

export interface ICard{
    id: number,
    fileName: string,
    value: number
}

export interface ICard{
    id: number,
    fileName: string,
    value: number
}