import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { ModalCustomStyles } from './ModalCustomStyles';
import Truncate from 'react-truncate';
import ReactStars from 'react-stars';

class Book extends Component {
  state = {
    modalIsOpen: false
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  onChangeCategory = (id, category) => {
    this.props.onChangeCategory(id, category);
  }

  render() {
    const { id, imageLinks, shelf, title, authors, description, infoLink, averageRating } = this.props;
    const { modalIsOpen } = this.state;

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            onClick={this.openModal}
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${imageLinks.smallThumbnail})`
            }}>
          </div>
          <div className="book-shelf-changer">
            <select
              onChange={(event) => this.onChangeCategory(id, event.target.value)}
              value={shelf}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title" onClick={this.openModal}>{title}</div>
        <div className="book-authors">{authors.join(', ')}</div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={this.modalIsClose}
          style={ModalCustomStyles}
          shouldCloseOnOverlayClick={true}
          contentLabel="Book detail"
        >
          <div style={ModalCustomStyles.modalTitle}>{title}</div>
          <div style={ModalCustomStyles.modalCover}>
            <img src={imageLinks.thumbnail} alt={title} />
            <select
              onChange={(event) => this.onChangeCategory(id, event.target.value)}
              value={shelf}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
          <div style={ModalCustomStyles.modalDescription}>
            <div style={ModalCustomStyles.modalAuthors}>
              {authors.length > 1 ? 'Authors': 'Author'}: {authors.join(', ')}
            </div>
            <div style={ModalCustomStyles.modalDescription}>
              <Truncate
                lines={3}
                ellipsis={<span>... <a href={infoLink} target="_blank">Read more</a></span>}
              >
                {description}
              </Truncate>
            </div>
            {averageRating && (
              <ReactStars
                count={5}
                size={18}
                value={averageRating}
                edit={false}
              />
            )}
          </div>
          <button
            style={ ModalCustomStyles.modalClose }
            onClick={this.closeModal}>
            X
          </button>
        </Modal>
      </div>
    )
  }
}

Book.propTypes = {
  id: PropTypes.string,
  imageLinks: PropTypes.object,
  shelf: PropTypes.string,
  title: PropTypes.string,
  infoLink: PropTypes.string,
  averageRating: PropTypes.number,
  description: PropTypes.string,
  authors: PropTypes.array
}

export default Book;