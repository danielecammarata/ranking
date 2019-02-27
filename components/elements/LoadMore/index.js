import Button from '@material-ui/core/Button'

const styleLoadMoreButton = active => ({
  display: active ? 'block' : 'none',
  margin: '0 auto',
})

const LoadMore = ({
  loadMoreActive = false,
  loadMore
}) =>
  <Button
    color="primary"
    disabled={!loadMoreActive}
    onClick={loadMore}
    style={styleLoadMoreButton(loadMoreActive)}
    type="button"
    variant="contained"
    >
    Load more
  </Button>

export default LoadMore
