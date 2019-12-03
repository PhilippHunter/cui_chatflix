import { PositionType } from './player'

export class User {
    id: number
    firstName: string
    lastName: string
    playerName: string
    actionId: string
    preferredPosition?: PositionType
}