/**
 * A game component having an id.
 */
class Component {
  /**
   * Creates a component with the given id.
   *
   * @param {string} id Component id
   */
  constructor(id) {
    this._id = id;
  }

  /**
   * @returns {string} the component id
   */
  get id() { return this._id; }
}
