import React, { useEffect } from "react";
import { Pagination } from "semantic-ui-react";

interface Props {
  setSkip: any;
  skip: number;
  limit: number;
  pages: number;
}
export const PaginationComponent: React.FC<Props> = ({
  setSkip,
  skip,
  limit,
  pages,
}) => {
  const nextPage = () => {
    setSkip(skip + limit);
  };

  const previousPage = () => {
    setSkip(skip - limit);
  };

  const onPaginationHandler = (e: any) => {
    const value = +e.target.innerHTML;
    if (!isNaN(value)) {
      setSkip((value - 1) * limit);
    }
    if (e.target.type === "prevItem" && skip !== 0) {
      previousPage();
    } else if (e.target.type === "nextItem" && skip + limit !== pages * limit) {
      nextPage();
    }
  };


  return (
    <Pagination
      onClick={onPaginationHandler}
      boundaryRange={0}
      defaultActivePage={1}
      ellipsisItem={null}
      firstItem={null}
      lastItem={null}
      siblingRange={1}
      totalPages={pages}
    />
  );
};
