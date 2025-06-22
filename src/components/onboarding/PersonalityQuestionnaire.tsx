
import React, { useState } from 'react';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

interface QuestionnaireData {
  bigFiveScores: {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    neuroticism: number;
  };
  enneagramType: number | null;
  interestTags: string[];
  region: string;
  pronouns: string;
}

interface PersonalityQuestionnaireProps {
  onComplete: (data: QuestionnaireData) => void;
  onSkip: () => void;
}

const INTEREST_TAGS = [
  'Technology', 'Music', 'Art', 'Fitness', 'Travel', 'Food', 'Books', 'Gaming',
  'Photography', 'Nature', 'Sports', 'Movies', 'Science', 'Politics', 'Business',
  'Health', 'Education', 'Fashion', 'History', 'Philosophy', 'Psychology'
];

const ENNEAGRAM_TYPES = [
  { type: 1, name: "The Perfectionist", description: "Principled, purposeful, self-controlled" },
  { type: 2, name: "The Helper", description: "Generous, demonstrative, people-pleasing" },
  { type: 3, name: "The Achiever", description: "Adaptive, excelling, driven" },
  { type: 4, name: "The Individualist", description: "Expressive, dramatic, self-absorbed" },
  { type: 5, name: "The Investigator", description: "Perceptive, innovative, secretive" },
  { type: 6, name: "The Loyalist", description: "Engaging, responsible, anxious" },
  { type: 7, name: "The Enthusiast", description: "Spontaneous, versatile, acquisitive" },
  { type: 8, name: "The Challenger", description: "Self-confident, decisive, willful" },
  { type: 9, name: "The Peacemaker", description: "Receptive, reassuring, complacent" }
];

export const PersonalityQuestionnaire: React.FC<PersonalityQuestionnaireProps> = ({
  onComplete,
  onSkip
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<QuestionnaireData>({
    bigFiveScores: {
      openness: 50,
      conscientiousness: 50,
      extraversion: 50,
      agreeableness: 50,
      neuroticism: 50
    },
    enneagramType: null,
    interestTags: [],
    region: '',
    pronouns: ''
  });

  const handleBigFiveChange = (trait: string, value: number[]) => {
    setFormData(prev => ({
      ...prev,
      bigFiveScores: {
        ...prev.bigFiveScores,
        [trait]: value[0]
      }
    }));
  };

  const toggleInterestTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      interestTags: prev.interestTags.includes(tag)
        ? prev.interestTags.filter(t => t !== tag)
        : [...prev.interestTags, tag].slice(0, 10) // Max 10 tags
    }));
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Tell us about yourself</CardTitle>
              <p className="text-stone-600">This helps us create better connections in your Groves</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="pronouns">Pronouns</Label>
                <Input
                  id="pronouns"
                  value={formData.pronouns}
                  onChange={(e) => setFormData(prev => ({ ...prev, pronouns: e.target.value }))}
                  placeholder="they/them, she/her, he/him, etc."
                  className="border-stone-300 focus:border-earth-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Input
                  id="region"
                  value={formData.region}
                  onChange={(e) => setFormData(prev => ({ ...prev, region: e.target.value }))}
                  placeholder="e.g., San Francisco Bay Area, London, etc."
                  className="border-stone-300 focus:border-earth-500"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Your Interests</CardTitle>
              <p className="text-stone-600">Select up to 10 topics you're passionate about</p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {INTEREST_TAGS.map(tag => (
                  <Badge
                    key={tag}
                    variant={formData.interestTags.includes(tag) ? "default" : "outline"}
                    className={`cursor-pointer transition-colors ${
                      formData.interestTags.includes(tag) 
                        ? 'bg-earth-600 hover:bg-earth-700' 
                        : 'hover:bg-earth-50 border-earth-300'
                    }`}
                    onClick={() => toggleInterestTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-stone-500 mt-4">
                Selected: {formData.interestTags.length}/10
              </p>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Enneagram Type</CardTitle>
              <p className="text-stone-600">Choose the type that resonates most with you</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {ENNEAGRAM_TYPES.map(({ type, name, description }) => (
                <div
                  key={type}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    formData.enneagramType === type 
                      ? 'border-earth-500 bg-earth-50' 
                      : 'border-stone-200 hover:border-earth-300'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, enneagramType: type }))}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      formData.enneagramType === type ? 'bg-earth-600 text-white' : 'bg-stone-200'
                    }`}>
                      {type}
                    </div>
                    <div>
                      <h4 className="font-medium">{name}</h4>
                      <p className="text-sm text-stone-600">{description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Personality Traits</CardTitle>
              <p className="text-stone-600">Rate yourself on these dimensions (1-100)</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries({
                openness: "Openness to Experience",
                conscientiousness: "Conscientiousness", 
                extraversion: "Extraversion",
                agreeableness: "Agreeableness",
                neuroticism: "Emotional Stability (low = more stable)"
              }).map(([trait, label]) => (
                <div key={trait} className="space-y-2">
                  <div className="flex justify-between">
                    <Label>{label}</Label>
                    <span className="text-sm text-stone-600">
                      {formData.bigFiveScores[trait as keyof typeof formData.bigFiveScores]}
                    </span>
                  </div>
                  <Slider
                    value={[formData.bigFiveScores[trait as keyof typeof formData.bigFiveScores]]}
                    onValueChange={(value) => handleBigFiveChange(trait, value)}
                    max={100}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium text-earth-700">Complete Your Profile</h2>
        <div className="text-sm text-stone-600">Step {step} of 4</div>
      </div>

      <div className="w-full bg-stone-200 rounded-full h-2">
        <div 
          className="bg-earth-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      {renderStep()}

      <div className="flex justify-between">
        <div>
          {step > 1 && (
            <button
              onClick={handleBack}
              className="px-4 py-2 text-stone-600 hover:text-stone-800 transition-colors"
            >
              Back
            </button>
          )}
        </div>
        
        <div className="space-x-4">
          <button
            onClick={onSkip}
            className="px-4 py-2 text-stone-600 hover:text-stone-800 transition-colors"
          >
            Skip for now
          </button>
          
          <PrimaryButton
            onClick={handleNext}
            className="bg-earth-600 hover:bg-earth-700"
          >
            {step === 4 ? 'Complete' : 'Next'}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
