import { useEffect, useState } from "react";
import { getRepos } from "../services/ApiService";
import RepoDetails from "../components/RepoDetails";
import { RepoList } from "../models/Repo";

export default function HomePage() {
  const [repos, setRepos] = useState<RepoList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loadRepos = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const data = await getRepos(page, '2024-07-15', 'GITHUB_API_KEY');
      setRepos((prev) => [...prev, ...data.items]);
      setHasMore(data.items.length > 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRepos();
  }, [page]);

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 10 && !loading && hasMore) {
        setPage((prev) => prev + 1);
      }
    };
    
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [loading, hasMore]);

  return (
    <div>
      <h1 className="text-center mt-4 mb-8">Trending Repos</h1>
      {repos.map((repo, index) => (
        <RepoDetails key={index} data={repo} />
      ))}
      {loading && (
        <div className="d-flex justify-content-center mt-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}
