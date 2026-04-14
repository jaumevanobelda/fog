
import Loading from "@/components/ui/loading";
import { useConfirm } from "@/mutations/auth/useLogin";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


export default function Confirm() {
	const navigate = useNavigate();
	const confirm_token = useParams().confirm_token;
	console.log("confirm_token ", confirm_token);
	const { mutateAsync } = useConfirm();
	useEffect(() => {
		async function confirm() {

			try {
				await mutateAsync(confirm_token!);
				navigate("/");
			} catch (error) {
				navigate("/");
			}
		}
		confirm();
	}, []);
	return (
		<>
			<Loading />
		</>
	)




}
