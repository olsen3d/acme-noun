const Sequelize = require('sequelize');
const connection = new Sequelize('postgres://localhost/acme_nouns');

const Person = connection.define('person', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  name: {
    unique: true,
    allowNull: false,
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  }
});

const Place = connection.define('place', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  name: {
    unique: true,
    allowNull: false,
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  }
});
const Thing = connection.define('thing', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  name: {
    unique: true,
    allowNull: false,
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  }
});

Person.belongsTo(Place);
Thing.belongsTo(Person);

const sync = async () => {
  await connection.sync({ force: true });
  const [Brooklyn, Queens, Bronx] = await Promise.all([
    Place.create({ name: 'Brooklyn' }),
    Place.create({ name: 'Queens' }),
    Place.create({ name: 'Bronx ' })
  ]);
  const [Larry, Moe, Curly] = await Promise.all([
    Person.create({ name: 'Larry', placeId: Brooklyn.id }),
    Person.create({ name: 'Moe', placeId: Queens.id }),
    Person.create({ name: 'Curly', placeId: Bronx.id})
  ]);

  const [laptop, tv, phone] = await Promise.all([
    Thing.create({ name: 'laptop', personId: Larry.id }),
    Thing.create({ name: 'tv', personId: Moe.id }),
    Thing.create({ name: 'phone ', personId: Curly.id })
  ]);
};

module.exports = {
  sync,
  Thing,
  Person,
  Place
};
