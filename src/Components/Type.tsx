export interface FrendID {
    id: number,
    img: string,
    title: string,
    coins: number,
    bonus: number,
    ton: number
}

export interface LeaderID {
    id: number,
    img: string,
    title: string,
    coins: number,
    bonus: number,
    ton: number
}

export interface levelID {
    id: number,
    title: string,
    percent: number,
    img: string,
    schedule: string,
    ton: number
}

export interface TermsID {
    id: number,
    date: number,
    period:string,
    ending: number,
    repayment: number,
    dateRepayment: string,
    bid: number,
    ton: string
}