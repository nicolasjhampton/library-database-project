export default function (res) {
  return function(err) {
    res.send(err.message);
  }
}
