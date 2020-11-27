import { knex } from '../util/knex'

export interface Genre {
  id: number
  name: string
}

export function list(): Promise<Genre[]> {
  return knex.from('genre').select()
}

export function find(id: number): Promise<Genre> {
  return knex.from('genre').where({ id }).first()
}

/** @returns whether the ID was actually found */
export async function remove(id: number): Promise<boolean> {
  const count = await knex.from('genre').where({ id }).delete()
  return count > 0
}

/** @returns the ID that was created */
export async function create(name: string): Promise<number> {
  const [ id ] = await (knex.into('genre').insert({ name }))
  return id
}

/** @returns whether the ID was actually found */
export async function update(id: number, name: string): Promise<boolean>  {
  const count = await knex.from('genre').where({ id }).update({ name })
  return count > 0
}

export function getActors(id: number): Promise<any> {
  return knex.from('actor as a')
    .select('a.name AS actorName')
    .count('a.id as movieAppearances')
    .join('movie_actor as ma', 'ma.actorId', 'a.id')
    .join('movie_genre as mg', 'mg.movieId', 'ma.movieId')
    .where('mg.genreId', id)
    .groupBy('a.name')
    .orderBy('movieAppearances', 'desc')
}
