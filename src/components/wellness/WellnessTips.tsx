import { Leaf, ArrowRight, BookOpen, Droplets, Sun, Moon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface WellnessTip {
  id: string;
  title: string;
  description: string;
  category: 'diet' | 'lifestyle' | 'exercise' | 'meditation';
  icon: React.ElementType;
  tags: string[];
  timeToRead: string;
}

const wellnessTips: WellnessTip[] = [
  {
    id: "1",
    title: "Morning Warm Water with Ginger",
    description: "Start your day with a glass of warm water infused with fresh ginger and a pinch of rock salt. This ancient Ayurvedic practice kindles your digestive fire (Agni), aids detoxification, and prepares your system for the day ahead.",
    category: "diet",
    icon: Droplets,
    tags: ["tridoshic", "digestive health"],
    timeToRead: "2 min read"
  },
  {
    id: "2", 
    title: "Abhyanga - Daily Oil Massage",
    description: "Practice self-massage with warm sesame oil before your morning shower. This nourishing ritual improves circulation, calms the nervous system, and enhances skin health.",
    category: "lifestyle",
    icon: Sun,
    tags: ["vata balancing", "self-care"],
    timeToRead: "3 min read"
  },
  {
    id: "3",
    title: "Pranayama for Stress Relief", 
    description: "Practice Nadi Shodhana (alternate nostril breathing) for 10 minutes daily. This balances the nervous system and reduces stress hormones.",
    category: "meditation",
    icon: Moon,
    tags: ["stress relief", "breathwork"],
    timeToRead: "2 min read"
  }
];

const categoryColors = {
  diet: "bg-green-100 text-green-800 border-green-200",
  lifestyle: "bg-blue-100 text-blue-800 border-blue-200", 
  exercise: "bg-orange-100 text-orange-800 border-orange-200",
  meditation: "bg-purple-100 text-purple-800 border-purple-200"
};

export function WellnessTips() {
  return (
    <div className="space-y-6">
      {/* Today's Featured Tip */}
      <Card className="shadow-wellness border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Leaf className="w-5 h-5 text-primary" />
              <span>Today's Wellness Tip</span>
            </CardTitle>
            <Button variant="ghost" size="sm">
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Badge className={cn("border", categoryColors[wellnessTips[0].category])}>
              {wellnessTips[0].category}
            </Badge>
            {wellnessTips[0].tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <h3 className="text-xl font-semibold text-foreground">
            {wellnessTips[0].title}
          </h3>
          
          <p className="text-muted-foreground leading-relaxed">
            {wellnessTips[0].description}
          </p>
          
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm text-muted-foreground">
              Personalized for your wellness journey
            </span>
            <Button variant="link" className="text-primary p-0">
              More Tips <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* All Wellness Tips */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <span>Wellness Library</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {wellnessTips.map((tip) => {
              const IconComponent = tip.icon;
              
              return (
                <div
                  key={tip.id}
                  className="p-4 rounded-lg border border-border hover:shadow-soft transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={cn("border text-xs", categoryColors[tip.category])}>
                          {tip.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {tip.timeToRead}
                        </span>
                      </div>
                      
                      <h4 className="font-semibold text-foreground mb-2">
                        {tip.title}
                      </h4>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {tip.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-1">
                          {tip.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <Button variant="ghost" size="sm" className="text-primary">
                          Read More
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 text-center">
            <Button variant="outline" className="bg-gradient-wellness">
              <BookOpen className="w-4 h-4 mr-2" />
              Explore All Tips
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}