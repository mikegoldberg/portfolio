import axios from "axios";
import { useEffect, useState } from "react";
import { formatDate } from "../helpers";

const ENDPOINT_NASA_APOD = "https://webkitstudio.com/services/apod.php";
const DEFAULT_TOTAL_RESULTS = 5;

export type UseApodResults = {
  data: Array<ApodDataItem>;
  navigate: (directon: number) => void;
  historyIdx: number;
};

export type ApodDataItem = {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
  thumbnail_url: string;
};

const useApod = () => {
  const [totalResults] = useState(DEFAULT_TOTAL_RESULTS);
  const [data, setData] = useState(
    new Array(DEFAULT_TOTAL_RESULTS).fill(null).map((_) => ({}))
  );
  const [historyIdx, setHistoryIdx] = useState(0);

  const navigate = (direction: number) => {
    setData(new Array(totalResults).fill({}));
    setHistoryIdx(historyIdx + direction);
  };

  useEffect(() => {
    const startDate = formatDate(
      new Date(
        new Date().setDate(
          new Date().getDate() -
            (totalResults - 1 + historyIdx * totalResults * -1)
        )
      )
    );
    const endDate = formatDate(
      new Date(
        new Date().setDate(
          new Date().getDate() - historyIdx * totalResults * -1
        )
      )
    );

    axios
      .get(
        `${ENDPOINT_NASA_APOD}?thumbs=true&start_date=${startDate}&end_date=${endDate}`
      )
      .then(({ data }) => {
        const items = data.map((item: ApodDataItem) => ({
          ...item,
          date: item.date.split("-").slice(1).join("/"),
        }));
        setData(items);
      });
  }, [totalResults, historyIdx]);

  return { data, navigate, historyIdx };
};

export default useApod;
