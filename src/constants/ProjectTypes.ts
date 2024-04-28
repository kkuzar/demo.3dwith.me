import React from 'react'

export type PeoplesType = {
    name: string
}

export type HeroType = {
    id?: number,
    how: string,
    when: string,
    peoples: PeoplesType[],
    names?: string[],
    created_at?: string,
    updated_at?: string
}

export type CoffeeRequestType = {
    coffee_price: number,
    eur_inserted: number
}

export type CoffeeResponseType = {
    count: number,
    coins: number[],
}

export const API_BASE = 'http://192.168.8.108:8000'
// export const API_BASE = 'http://iceyeapi.kuzar.fi'
export const PIC_API = '/showme/'
export const COIN_API = '/coins/'
export const HERO_ADD_LIST = '/rest/hero/'
export const HERO_DETAIL = (id: number) => `/rest/hero/${id}/`
