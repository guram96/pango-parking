export type User  = {
    id: number
    firstName: string
    lastName: string
    email: string
}

export type ParkingLog ={
    id: number;
    isParked: boolean;
    parkedOnSpace: string;
    startTime: string;
    endTime: string;
    price: number;
    city: string;
    total?: number
}

export type City = {
    id: number;
    name: string;
    parkingAreas: string[];
    parkingPrice: Array<{
        id: number;
        from: string;
        to: string;
        price: number;
    }>;
}