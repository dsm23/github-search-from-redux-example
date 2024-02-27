import type { FunctionComponent } from "react";
import type { Endpoints } from "@octokit/types";

type Props = {
  loadingLabel: string;
  pageCount?: number;
  renderItem: ([repo, owner]: [
    Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"],
    Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"]["owner"],
  ]) => JSX.Element[];
  items: [
    Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"],
    Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"]["owner"],
  ][];
  isFetching: boolean;
  onLoadMoreClick: () => void;
  nextPageUrl: string;
};

const List: FunctionComponent<Props> = ({
  isFetching = true,
  items,
  loadingLabel = "Loading...",
  nextPageUrl,
  pageCount,
  renderItem,
  onLoadMoreClick,
}) => {
  const renderLoadMore = () => {
    return (
      <button
        style={{ fontSize: "150%" }}
        onClick={onLoadMoreClick}
        disabled={isFetching}
      >
        {isFetching ? "Loading..." : "Load More"}
      </button>
    );
  };

  const isEmpty = items.length === 0;
  if (isEmpty && isFetching) {
    return (
      <h2>
        <i>{loadingLabel}</i>
      </h2>
    );
  }

  const isLastPage = !nextPageUrl;
  if (isEmpty && isLastPage) {
    return (
      <h1>
        <i>Nothing here!</i>
      </h1>
    );
  }

  return (
    <div>
      {items.map(renderItem)}
      {pageCount && pageCount > 0 && !isLastPage && renderLoadMore()}
    </div>
  );
};

export default List;
