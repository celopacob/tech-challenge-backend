import { knex } from '../util/knex'


export interface Actor {
  id: number
  name: string
  bio: string
  bornAt: Date
}

export function list(): Promise<Actor[]> {
  return knex.from('actor').select()
}

export function find(id: number): Promise<Actor> {
  return knex.from('actor').where({ id }).first()
}

/** @returns whether the ID was actually found */
export async function remove(id: number): Promise<boolean> {
  const count = await knex.from('actor').where({ id }).delete()
  return count > 0
}

/** @returns the ID that was created */
export async function create(name: string, bio: string, bornAt: Date): Promise<number> {
  const [ id ] = await (knex.into('actor').insert({ name, bio, bornAt }))
  return id
}

/** @returns whether the ID was actually found */
export async function update(id: number, name: string, bio: string, bornAt: Date): Promise<boolean>  {
  const count = await knex.from('actor').where({ id }).update({ name, bio, bornAt })
  return count > 0
}

export function findCharacters(id: number): Promise<any[]> {
  return knex.from('movie_actor').where('actorId', id)
}

export function countMoviesByGenre(id: number): Promise<any> {
  return knex.from('genre as g')
    .select('g.name AS genreName')
    .count('g.id as movieCount')
    .join('movie_genre as mg', 'mg.genreId', 'g.id')
    .join('movie_actor as ma', 'ma.movieId', 'mg.movieId')
    .where('ma.actorId', id)
    .groupBy('g.name')
    .orderBy('movieCount', 'desc')
}
