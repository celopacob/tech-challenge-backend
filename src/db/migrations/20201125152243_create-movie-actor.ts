import * as Knex from 'knex'


export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`
    CREATE TABLE movie_actor (
      id             INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
      movieId        INT(10) UNSIGNED NOT NULL,
      actorId        INT(10) UNSIGNED NOT NULL,
      characterName  VARCHAR(50) NOT NULL,

      CONSTRAINT PK_movie_actor__id PRIMARY KEY (id),
      CONSTRAINT FK_movie_actor__movie__id FOREIGN KEY (movieId) REFERENCES movie (id),
      CONSTRAINT FK_movie_actor__actor__id FOREIGN KEY (actorId) REFERENCES actor (id)
    );
  `)
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.raw('DROP TABLE movie_actor;')
}
