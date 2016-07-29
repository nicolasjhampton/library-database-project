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
    book_id: DataTypes.INTEGER,
    patron_id: DataTypes.INTEGER,
    loaned_on: { type: DataTypes.DATEONLY, defaultValue: now },
    return_by: { type: DataTypes.DATEONLY, defaultValue: oneWeek },
    returned_on: DataTypes.DATE
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
