"use client";
import { getDistanceByTwoPoints } from "@/helper/location";
import { useLocation } from "@/hooks/LocationHook";
import { HStack, Icon, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { IoMdPin } from "react-icons/io";

import { useMap } from "@/hooks/MapHook";
import { useEffect } from "react";
import { getStories } from "./story_mock";

export default function TopPage() {
	const { position } = useLocation();
	const { map, isMapLoaded } = useMap();
	const stories = getStories();

	if (map && position) {
		map.flyTo({
			center: [position.coords.longitude, position.coords.latitude],
			zoom: 20,
			duration: 500,
		});
	}

	useEffect(() => {
		if (!map || !isMapLoaded || !stories) {
			return;
		}
		// 数が多そうなのでlayerで表示するようにする
		stories.forEach((story, i) => {
			map.addSource(`story${i}`, {
				type: "geojson",
				data: {
					type: "Feature",
					geometry: {
						type: "Point",
						coordinates: [story.longitude ?? 0, story.latitude ?? 0],
					},
					properties: {},
				},
			});
			map.addLayer({
				id: `story${i}`,
				type: "circle",
				source: `story${i}`,
				paint: {
					"circle-radius": 10,
					"circle-color": story.type === "short" ? "#eab308" : "#22c55e",
					"circle-stroke-color": "white",
					"circle-stroke-width": 3,
				},
			});
		});
		return () => {
			stories.forEach((story, i) => {
				if (map.getLayer(`story${i}`)) map.removeLayer(`story${i}`);
				if (map.getSource(`story${i}`)) map.removeSource(`story${i}`);
			});
		};
	}, [map, isMapLoaded, stories]);

	if (!position) {
		return <div>Loading...</div>;
	}

	const storiesWithDistance = stories.map((story) => {
		const distance = getDistanceByTwoPoints(
			position.coords.latitude,
			position.coords.longitude,
			story.latitude ?? 0,
			story.longitude ?? 0,
		);
		return {
			...story,
			distance,
		};
	});

	return (
		<div>
			<Text textStyle="2xl" fontWeight={"bold"} mb={5}>
				近くの謎解き
			</Text>
			<VStack w="100%" gap={4} align="stretch">
				{storiesWithDistance.map(
					(story) =>
						story.status === "published" && ( //一応statusがpublishedのものだけ表示するようにしている(クエリ投げるときに対処してほしい)
							<Link key={story.id} href={`/story/${story.id}`}>
								<HStack
									justifyContent="space-between"
									w="100%"
									p={4}
									borderRadius={8}
									borderWidth={1}
									borderColor="gray.200"
									_hover={{
										bg: "gray.100",
									}}
								>
									<HStack justifyContent={"flex-start"}>
										<Icon
											color={
												story.type === "short" ? "yellow.500" : "green.500"
											}
											boxSize={12}
											fontSize={24}
											borderRadius="full"
											borderWidth={1}
											borderColor="gray.200"
										>
											<IoMdPin />
										</Icon>
										<Text textWrap={"balance"}>{story.title}</Text>
									</HStack>
									<VStack alignItems={"flex-end"}>
										<Text color={"gray.500"} fontSize={"sm"}>
											{story.estimated_time}
										</Text>
										<Text color={"gray.500"} fontSize={"sm"}>
											{Math.floor(story.distance)}m
										</Text>
									</VStack>
								</HStack>
							</Link>
						),
				)}
			</VStack>
		</div>
	);
}
