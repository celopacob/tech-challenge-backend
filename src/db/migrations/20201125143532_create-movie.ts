import * as Knex from 'knex'


export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`
    CREATE TABLE movie (
      id         INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
      name       VARCHAR(50) NOT NULL,
      synopsis   VARCHAR(500),
      releasedAt DATE NOT NULL,
      runtime    INT(4),
  
      CONSTRAINT PK_movie__id PRIMARY KEY (id),
      CONSTRAINT UK_movie__name UNIQUE KEY (name)
    );
  `)
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.raw('DROP TABLE movie;')
}
