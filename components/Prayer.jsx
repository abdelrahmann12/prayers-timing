import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";


export default function Prayer({name,time,img}) {
  return (
    
      <Card xs={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image= {img}
            alt="green iguana"
          />
          <CardContent>
            {/* اسم الصلاه */}
            <h2>
              {name}
            </h2>
            {/* وقت الصلاه */}
            <Typography variant="h1" color="text.secondary">
              {time}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    
  );
}
