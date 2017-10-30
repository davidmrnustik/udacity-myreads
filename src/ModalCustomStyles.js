export const ModalCustomStyles = {
  overlay: {
    zIndex : 999,
    backgroundColor : 'rgba(0, 0, 0, 0.75)'
  },
  content : {
    top : '50%',
    left : '50%',
    right : 'auto',
    bottom : 'auto',
    marginRight : '-50%',
    transform : 'translate(-50%, -50%)',
    borderRadius : 0
  },
  modalClose: {
    position: 'absolute',
    right: 8,
    top: -3,
    WebkitAppearance: 'none',
    border: 0,
    display: 'block',
    width: 'auto',
    cursor: 'pointer',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    backgroundColor: 'rgb(230, 230, 230)',
    textTransform: 'uppercase',
    margin: '10px auto 0 auto',
    padding: '7px 10px'
  },
  modalImage: {
    cursor: 'pointer'
  },
  modalCover: {
    float: 'left',
    width: 138,
    marginRight: 20
  },
  modalDescription: {
    // float: 'left',
    maxWidth: 400,
    fontSize: 13,
    marginBottom: 5
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    margin: '0 40px 15px 0',
    padding: 0
  },
  modalAuthors: {
    fontSize: 13,
    paddingBottom: 10,
    fontStyle: 'italic'
  }
};