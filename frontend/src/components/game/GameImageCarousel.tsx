import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

export function GameImageCarousel({ images }: { images: Array<string> }) {

  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)


  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <Carousel setApi={setApi} className="w-full px-2" opts={{ watchDrag: false }}>
        <CarouselContent>
          {
            images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="w-full aspect-video overflow-hidden rounded">
                  <img
                    src={image}
                    alt={`Game image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))
          }
        </CarouselContent>
      </Carousel>
      <Carousel opts={{ align: "start", watchDrag: false }} className={`w-full px-${images.length < 6 ? 0:12}`}>
        <CarouselContent className="-ml-1 md:-ml-2">
          {
            images.map((image, index) => (
              <CarouselItem key={index} className="pl-1 md:pl-3 basis-1/6">
                <div
                  onClick={() => setSlide(index)}
                  className="cursor-pointer relative aspect-video overflow-hidden rounded border-2 border-transparent hover:border-white transition-all h-[175%] w-[115%]"
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))
          }
        </CarouselContent>
        {images.length < 6 ? "" :(<>
        <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2" />
        <CarouselNext className="right-2 top-1/2 -translate-y-1/2" />
        </>
        )
        }
      </Carousel>
    </div>
  )


  function setSlide(index: number) {
    api?.scrollTo(index)
    console.log("CURRENT ", current)
    console.log("count ", count)
  }
}