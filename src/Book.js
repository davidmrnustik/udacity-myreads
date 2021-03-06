import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import SelectCategory from './SelectCategory';
import { ModalCustomStyles } from './ModalCustomStyles';
import Truncate from 'react-truncate';
import ReactStars from 'react-stars';

/**
 * Book receives book details props and renders this information.
 * There is a modal window that shows more information.
 */
class Book extends Component {
  static propTypes = {
    id: PropTypes.string,
    imageLinks: PropTypes.object,
    shelf: PropTypes.string,
    title: PropTypes.string,
    infoLink: PropTypes.string,
    averageRating: PropTypes.number,
    description: PropTypes.string,
    authors: PropTypes.array,
    onChangeCategory: PropTypes.func.isRequired
  }

  state = {
    modalIsOpen: false
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { id, imageLinks, shelf, title, authors, description, infoLink, averageRating, onChangeCategory } = this.props;
    const { modalIsOpen } = this.state;

    return (
      <div className='book'>
        <div className='book-top'>
          <div
            className='book-cover'
            onClick={this.openModal}
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${imageLinks.smallThumbnail})`
            }}>
          </div>
          <div className='book-shelf-changer'>
            <SelectCategory
              shelf={shelf}
              id={id}
              onChangeCategory={onChangeCategory}
            />
          </div>
        </div>
        <div className='book-title' onClick={this.openModal}>{title}</div>
        <div className='book-authors'>{authors.join(', ')}</div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={this.modalIsClose}
          style={ModalCustomStyles}
          shouldCloseOnOverlayClick={true}
          contentLabel='Book detail'
        >
          <div style={ModalCustomStyles.modalTitle}>{title}</div>
          <div style={ModalCustomStyles.modalCover}>
            <img src={imageLinks.thumbnail} alt={title} />
            <SelectCategory
              shelf={shelf}
              id={id}
              onChangeCategory={onChangeCategory}
            />
          </div>
          <div style={ModalCustomStyles.modalDescription}>
            <div style={ModalCustomStyles.modalAuthors}>
              {authors.length > 1 ? 'Authors': 'Author'}: {authors.join(', ')}
            </div>
            <div style={ModalCustomStyles.modalDescription}>
              <Truncate
                lines={3}
                ellipsis={<span>... <a href={infoLink} target='_blank'>Read more</a></span>}
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

export default Book;