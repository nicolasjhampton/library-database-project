'use strict';
function now() {
  var current = new Date();
  var month = (current.getMonth() < 10) ? ("0" + (current.getMonth() + 1)) : (current.getMonth() + 1);
  var date = (current.getDate() < 10) ? ("0" + current.getDate()) : current.getDate();
  return current.getFullYear() + "-" + month + "-" + date;
}

function oneWeek() {
  var current = new Date();
  var weekFromNow = new Date(current.setDate(current.getDate() + 7));
  var month = (weekFromNow.getMonth() < 10) ? ("0" + (weekFromNow.getMonth() + 1)) : (weekFromNow.getMonth() + 1);
  var date = (weekFromNow.getDate() < 10) ? ("0" + weekFromNow.getDate()) : weekFromNow.getDate();
  return weekFromNow.getFullYear() + "-" + month + "-" + date;
}

module.exports = function(sequelize, DataTypes) {
  var Loan = sequelize.define('Loan', {
    book_id: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          msg: 'Book id must be numeric.'
        },
        notEmpty: {
          msg: 'A book id has not been entered.'
        }
      }
    },
    patron_id: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          msg: 'Patron id must be numeric.'
        },
        notEmpty: {
          msg: 'A patron id has not been entered.'
        }
      }
    },
    loaned_on: {
      type: DataTypes.DATEONLY,
      defaultValue: now,
      validate: {
        isDate: {
          msg: 'Please enter a valid date for a "loaned on" value.'
        },
        notEmpty: {
          msg: 'A "loaned on" date has not been entered.'
        }
      }
    },
    return_by: {
      type: DataTypes.DATEONLY,
      defaultValue: oneWeek,
      validate: {
        isDate: {
          msg: 'Please enter a valid date for a "return by" value.'
        },
        notEmpty: {
          msg: 'A "return by" date has not been entered.'
        }
      }
    },
    returned_on: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      validate: {
        isDate: {
          msg: 'Please enter a valid date for a "returned on" value.'
        },
        notEmpty: {
          msg: 'A "returned on" date has not been entered.'
        }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    timestamps: false,
    underscored: true
  });
  return Loan;
};
