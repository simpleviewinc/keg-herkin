@search @google
Feature: Google Search
  As an internet user
  In order to find out more about Keg-Hub
  I want to be able to search for information about the Keg-Hub
  
  Scenario: Search the web for keg-hub
    Given I open the site "https://www.google.com"
    When I set "keg-hub" to the inputfield ".gLFyf"
    And I press "enter"
    Then the element "#search" contains the text "https://github.com/simpleviewinc/keg-hub"
