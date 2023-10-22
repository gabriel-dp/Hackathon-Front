import { useFetchData } from "@/hooks/useFetchData";
import { Achievment } from "@/types/types";

import { AchievmentCard, AchievmentsContainer, UserContainer } from "./styles";

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
	const { data: dataAchievments } = useFetchData<Achievment[]>(
		`${import.meta.env.VITE_API_URL}/conquista/todos`,
		generateHeaderUser(props.token)
	);
	const { data: dataUsername } = useFetchData<{ login: string }>(
		`${import.meta.env.VITE_API_URL}/usuario/dados`,
		generateHeaderUser(props.token)
	);

	console.log(dataUsername, dataAchievments);

	return (
		<UserContainer>
			<div className="content">
				<p className="welcome">Bem vindo(a), {dataUsername?.login}!</p>
				<div>
					<p className="title">Conquistas</p>
					<AchievmentsContainer>
						{dataAchievments?.map((achievment) => (
							<AchievmentCard key={achievment.id} $isComplete={achievment.isComplete.toString()}>
								{achievment.name}
							</AchievmentCard>
						))}
					</AchievmentsContainer>
				</div>
			</div>
		</UserContainer>
	);
}

