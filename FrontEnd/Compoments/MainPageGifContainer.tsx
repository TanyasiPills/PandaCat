import React, {
	useState,
	useEffect,
	useRef,
	useTransition,
	Suspense,
} from "react";
import ReallyScrewedUpSingleGif from "./ReallyScrewedUpSingleGif";
import { Col, Container, Row, Spinner, Image } from "react-bootstrap";
import "./CSS/MainPageGifContainer.css";
import CannotLoadGifs from "./CannotLoadGifs";

const beckendLocation = import.meta.env.backend_Url;
interface Props {
	taglist?: string[];
	weShallLoadMore?: boolean,
	onlyFavourites?: boolean
}


interface Gif {
	url: string;
	id: string;
	favourite: boolean;
}

var lst: React.JSX.Element[][] = [];
var oldData: Gif[] = [];

export default function GifContainer({ taglist, weShallLoadMore, onlyFavourites }: Props) {
	const [isPending, startTransition] = useTransition();
	const myRef = useRef<HTMLDivElement>(null);
	const [myElementIsVisible, setMyElementIsVisible] = useState(false);
	const [giflist, setGiflist] = useState<Gif[]>([]);
	var myKey: string | undefined = undefined;
	
	console.log({beckendLocation});

	const CamingFromChild =(value: string)=> {
		setGiflist((previous)=> [...previous].filter(x=> x.id != value));
		for (let index = 0; index < lst.length; index++) {
			for (let index1 = 0; index1 < lst[index].length; index1++) {
				if(lst[index][index1].props.singleId == value){
					lst[index].splice(index1,1);
				}
			}			
		}
	}

	if (weShallLoadMore || weShallLoadMore === undefined) useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			const entry = entries[0];
			if (entry.isIntersecting) {
				setMyElementIsVisible(true);
				startTransition(() => {
					fetchGifs(onlyFavourites == true ? "http://localhost:3000/favourites" :
						taglist === undefined || taglist === null
							? "http://localhost:3000/search"
							: "http://localhost:3000/popular",
						taglist
					);
				});
			}
		});

		if (myRef.current) {
			observer.observe(myRef.current);
		}

		return () => {
			if (myRef.current) {
				observer.unobserve(myRef.current);
			}
		};
	}, [taglist, startTransition]);

	else useEffect(() => {
		setGiflist([]); // Clear giflist when taglist changes
		myKey = undefined; // Reset key when taglist changes
		startTransition(() => {
		  fetchGifs(
			onlyFavourites == true ? "http://localhost:3000/favourites" :
						taglist === undefined || taglist === null
							? "http://localhost:3000/search"
							: "http://localhost:3000/popular",
						taglist
		  );
		});
	}, [taglist, startTransition]);

	const fetchGifs = async (url: string, searchstr?: string[]) => {
		try {
			const params: Record<string, string> = {};
			if (myKey) params["key"] = myKey;
			if (searchstr) params["q"] = searchstr.join(",");

			const response = await fetch(url + "?" + new URLSearchParams(params));
			const data = await response.json();

			if (onlyFavourites) {
				for (let i = 0; i < data.length; i++) data[i].favourite = true;
				setGiflist((prevList) => [...prevList, ...data]);
				oldData = data;
				myKey = undefined;
			}
			else {
				setGiflist((prevList) => [...prevList, ...data.gifs]);
				oldData = data.gifs;
				myKey = data.key;
			}
		} catch (error) {
			//console.error("Error fetching gifs:", error);
		}
	};

	if (giflist.length != lst.map(e => e.length).reduce((a, b) => a + b, 0)) {
		let columns = 4;

		if (lst.length == 0) {
			for (let i = 0; i < columns; i++) {
				lst[i] = [];
			}
		}

		let prio = lst.map((y, i) => [i, document.getElementById("gifc_" + i)?.clientHeight!]).sort((a, b) => a[1] - b[1]);
		for (let i = 0; i < prio.length; i++) if (!prio[i][1]) prio[i][1] = 0;

		let max = Math.max(...prio.map(e => e[1]));
		for (let i = 0; i < prio.length; i++) {
			prio[i][2] = Math.floor((max - prio[i][1]) / 200);
		}

		let index = 0;
		for (let i = 0; i < prio.length; i++) {
			for (let j = 0; j < prio[i][2]; j++) {
				lst[prio[i][0]].push(<ReallyScrewedUpSingleGif myCallbackFunc={CamingFromChild} key={oldData[j + index].id} imgsrc1={oldData[j + index].url} singleId={oldData[j + index].id} favourite1={oldData[j + index].favourite} />)
			}
			index += prio[i][2];
		}

		let prioIndex = 0;
		while (index < oldData.length) {
			if (prioIndex == prio.length) prioIndex = 0;
			lst[prio[prioIndex][0]].push(<ReallyScrewedUpSingleGif myCallbackFunc={CamingFromChild} key={oldData[index].id} imgsrc1={oldData[index].url} singleId={oldData[index].id} favourite1={oldData[index].favourite} />);
			index++;
			prioIndex++;
		}
	}

	return (
		<Container>
			<Suspense fallback={<Spinner />}>
				<div className="gifrow">
					{lst.length > 0 ?
						lst.map(e => <div className="gifcolumn" id={"gifc_" + lst.indexOf(e)} key={lst.indexOf(e)}>{e}</div>) : <CannotLoadGifs />}
				</div>
			</Suspense>
			{weShallLoadMore === undefined || weShallLoadMore === true ? <div ref={myRef} id="spinnispinner" className="d-flex justify-content-center">
				{myElementIsVisible && <Spinner />}</div> : <></>}

		</Container>
	)


	/*return (
	  <Container>
		<Suspense fallback={<Spinner />}>
		  <Row>
			{giflist.map((gif) => (
			  <Col key={gif.id} xs={12} md={4}>
				<ReallyScrewedUpSingleGif
				  imgsrc1={gif.url}
				  singleId={gif.id}
				  favourite1={gif.favourite}
				/>
			  </Col>
			))}
		  </Row>
		</Suspense>
		<div ref={myRef} id="spinnispinner" className="d-flex justify-content-center">
		  {myElementIsVisible && <Spinner />}
		</div>
	  </Container>
	);
	*/
}