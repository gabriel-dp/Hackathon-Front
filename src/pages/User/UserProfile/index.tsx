import { useFetchData } from "@/hooks/useFetchData";
import { Achievment } from "@/types/types";

import { AchievmentCard, AchievmentsContainer, LogoutButton, QrCode, UserContainer } from "./styles";
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
	const { data: dataUsername } = useFetchData<{ login: string }>(
		`${import.meta.env.VITE_API_URL}/usuario/dados`,
		generateHeaderUser(props.token)
	);

	const { data: dataAchievments } = useFetchData<Achievment[]>(
		`${import.meta.env.VITE_API_URL}/conquista/todos`,
		generateHeaderUser(props.token)
	);

	const generateLink = (achievment: Achievment) =>
		`${import.meta.env.VITE_API_URL}/conquista/consumir/${achievment.id}/?token=${props.token}`;

	return (
		<UserContainer>
			<div className="content">
				<p className="welcome">Bem vindo(a), {dataUsername?.login}!</p>
				<div>
					<p className="title">Conquistas</p>
					<p className="text">Cada conquista fornece cupom, se aventure no Campo das Vertentes para ganhar todos!</p>
					<AchievmentsContainer>
						{dataAchievments &&
							dataAchievments
								.sort((a, b) => {
									return a.isConsumed == !b.isConsumed ? 1 : 0;
								})
								.map((achievment) => (
									<AchievmentCard
										key={achievment.id}
										$state={achievment.isConsumed ? "used" : achievment.isComplete ? "complete" : "enabled"}>
										<div className="achievment">
											<p className="name">{achievment.name}</p>
											<p className="description">{achievment.description}</p>
											{achievment.isConsumed ||
												(achievment.isComplete && (
													<p className="finish">{formatDateToDDMMYYYY(new Date(achievment.finishDate))}</p>
												))}
											{achievment.isComplete && !achievment.isConsumed && (
												<QrCode
													src={`https://api.qrserver.com/v1/create-qr-code/?data=${generateLink(
														achievment
													)}&size=200x200}`}
												/>
											)}
										</div>
										<div className="reward">
											<p className="name">{achievment.reward.nome}</p>
											<p className="description">{achievment.reward.descricao}</p>
										</div>
									</AchievmentCard>
								))}
					</AchievmentsContainer>
				</div>
				<LogoutButton onClick={props.logout}>Sair da conta</LogoutButton>
			</div>
		</UserContainer>
	);
}

