import * as Knex from 'knex'


export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`
    CREATE TABLE movie_genre (
      id        INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
      movieId   INT(10) UNSIGNED NOT NULL,
      genreId   INT(10) UNSIGNED NOT NULL,

      CONSTRAINT PK_movie_genre__id PRIMARY KEY (id),
      CONSTRAINT FK_movie_genre__movie__id FOREIGN KEY (movieId) REFERENCES movie (id),
      CONSTRAINT FK_movie_genre__genre__id FOREIGN KEY (genreId) REFERENCES genre (id)
    );
  `)
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.raw('DROP TABLE movie_genre;')
}
