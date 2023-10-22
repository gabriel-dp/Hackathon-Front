import { useFetchData } from "@/hooks/useFetchData";
import { Achievment } from "@/types/types";

import { AchievmentCard, AchievmentsContainer, QrCode, UserContainer } from "./styles";
import useLocalStorage from "@/hooks/useLocalStorage";
import { formatDateToDDMMYYYY } from "@/utils/dates";

interface UserProfileI {
	token: string;
	logout: () => void;
}

const generateHeaderUser = (userToken: string) => ({
	method: "GET",
	headers: {
		token: userToken,
	},
});

export default function UserProfile(props: UserProfileI) {
	const [auth] = useLocalStorage("auth", { token: null });

	const { data: dataAchievments } = useFetchData<Achievment[]>(
		`${import.meta.env.VITE_API_URL}/conquista/todos`,
		generateHeaderUser(props.token)
	);
	const { data: dataUsername } = useFetchData<{ login: string }>(
		`${import.meta.env.VITE_API_URL}/usuario/dados`,
		generateHeaderUser(props.token)
	);

	console.log(dataUsername, dataAchievments);

	const generateLink = (achievment: Achievment) =>
		`${import.meta.env.VITE_API_URL}/conquista/consumir/${achievment.id}/?token=${auth.token}`;

	return (
		<UserContainer>
			<div className="content">
				<p className="welcome">Bem vindo(a), {dataUsername?.login}!</p>
				<div>
					<p className="title">Conquistas</p>
					<AchievmentsContainer>
						{dataAchievments?.map((achievment) => (
							<AchievmentCard
								key={achievment.id}
								$state={achievment.isConsumed ? "used" : achievment.isComplete ? "complete" : "enabled"}>
								<p className="name">{achievment.name}</p>
								<p className="description">{achievment.description}</p>
								{achievment.isConsumed ||
									(achievment.isComplete && (
										<p className="finish">{formatDateToDDMMYYYY(new Date(achievment.finishDate))}</p>
									))}
								{achievment.isComplete && !achievment.isConsumed && (
									<QrCode
										src={`https://api.qrserver.com/v1/create-qr-code/?data=${generateLink(achievment)}&size=200x200}`}
									/>
								)}
							</AchievmentCard>
						))}
					</AchievmentsContainer>
				</div>
			</div>
		</UserContainer>
	);
}

