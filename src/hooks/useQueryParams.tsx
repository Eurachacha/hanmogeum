import { useSearchParams } from "react-router-dom";

const useQueryParams = (queryKey: string) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const curQueryData = searchParams.getAll(queryKey) || [];

  const toggleFilter = (categoryName: string) => {
    if (curQueryData.length === 0) {
      searchParams.append(queryKey, categoryName);
      setSearchParams(searchParams);
    }

    const isExist = curQueryData[0]?.split(",").includes(categoryName);

    if (isExist) {
      // 해당 카테고리네임이 존재하므로 지워주는 로직
      const newQueryData = curQueryData[0].split(",").filter((item) => item !== categoryName);
      searchParams.delete(queryKey);
      searchParams.append(queryKey, newQueryData.join(","));

      // 지우고 나서 빈문자열이 되면 queryKey까지 다 지워주는 로직
      if (searchParams.getAll(queryKey)[0] === "") searchParams.delete(queryKey);
      setSearchParams(searchParams);
    } else if (curQueryData[0]) {
      // categoryName이 존재하지는 않지만, 다른 카테고리가 선택되어 있을때
      // 원래 있던 쿼리스트링과 categoryName 사이에 공백을 넣어 다시 세팅

      searchParams.delete(queryKey);
      const newQueryData = `${curQueryData[0]},${categoryName}`;
      searchParams.append(queryKey, newQueryData);
      setSearchParams(searchParams);
    }
  };

  const toggleDecafFilter = (boolean: boolean) => {
    if (boolean) {
      searchParams.append(queryKey, boolean.toString());
      setSearchParams(searchParams);
    } else {
      searchParams.delete(queryKey);
      setSearchParams(searchParams);
    }
  };

  const resetFilter = () => {
    setSearchParams("");
  };

  return { curQueryData, toggleFilter, toggleDecafFilter, resetFilter };
};

export default useQueryParams;
