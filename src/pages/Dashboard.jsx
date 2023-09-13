import { useEffect, useState } from "react";
import useGlobal from "../../hooks/useGlobal";
import useToken from "../../hooks/useToken";
import Table from "../components/Table";
import ModuleControl from "../components/module/ModuleControl";
import {
	fnGetCategories,
	fnGetComments,
	fnGetIssues,
} from "../utils/getFunctions";

const Dashboard = () => {
	const { token } = useToken();
	const { filter, newIssue } = useGlobal();

	const [issues, setIssues] = useState([]);
	const [sortIssues, setSortIssues] = useState([]);

	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [category, setCategory] = useState([]);
	const [issueSelected, setIssueSelected] = useState({});
	const [showComments, setShowComments] = useState(false);

	const getIssues = async () => {
		const response = await fnGetIssues(token, null, null);
		console.log(response.issue[0]);
		setIssues(response.issue[0]);
		setSortIssues(response.issue[0]);
	};

	useEffect(() => {
		const getCategories = async () => {
			const categories = await fnGetCategories(token);
			setCategory(categories);
		};
		getCategories();
		getIssues();
		setLoading(false);
	}, []);

	useEffect(() => {
		if (Object.keys(newIssue).length > 0) {
			setSortIssues([newIssue, ...issues]);
		}
		if (filter === "all") {
			setSortIssues(issues);
		}
		if (filter !== "all") {
			const sorted = issues.filter((i) => i.STATUS === filter);
			setSortIssues(sorted);
		}
	}, [filter, newIssue]);

	const handleComments = async (issue) => {
		issue.id !== 0
			? setComments(await fnGetComments(token, issue.id))
			: setComments([]);
		setShowComments(!showComments);
		setIssueSelected(issue);
	};

	const newComment = (comment) => {
		setComments([comment, ...comments]);
	};

	return (
		<main className="w-full grid">
			<section className="mt-10">
				<ModuleControl data={sortIssues} />
			</section>
			<section className="w-full mt-10 mx-auto">
				<Table
					loading={loading}
					issues={sortIssues}
					comments={comments}
					category={category}
					handleComments={handleComments}
					showComments={showComments}
					issueSelected={issueSelected}
					newComment={newComment}
				/>
			</section>
		</main>
	);
};

export default Dashboard;
