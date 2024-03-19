# GitHub Issues To Asana Tasks

#### Version 0.0.16

This integration creates Asana Tasks from GitHub issues. Once linked, Asana issues will be updated when Issues are updated or commented upon. The linked Asana Task will be completed when the GitHub issue is closed.

## Issues as Tasks

Tasks are a better mirror of Issues than Pull Requests. Issues are created because something needs doing, eg. _there is a task to be done._ Pull Requests are often created specifically to resolve an issue, eg. _to complete a task._

|                           | Task           | Issue         | Pull Request          |
| ------------------------- | -------------- | ------------- | --------------------- |
| **Feature/Bug Described** | Task Created   | Issue Created | -                     |
| **Creative/Research**     | Task Updated   | Issue Updated | -                     |
| **Work Started**          | Task Updated   | Issue Updated | Pull Request Created  |
| **Work Completed**        | Task Completed | Issue Closed  | Pull Request Accepted |

### Other wins

Because development happens on GitHub, having Issues attached to the code greatly reduces developer friction and prevents flow-breaking context shifts. Issues are attached to the code, and can be updated and resolved as part of the normal Git workflow. Issue creation is significantly more robust and faster using GitHub on Mobile, so QA can happen anywhere on a single device -- activating Mobile-friendly in-between spaces like subway commutes and other downtime.

## Example Action

To use this action, add a workflow like this to your repo:

```yaml
name: GitHub Issues to Asana Tasks

on:
  issues:
    types: [opened, closed, reopened, edited]
  issue_comment:
    types: [created]

jobs:
  issues-to-tasks:
    runs-on: ubuntu-latest

      - name: GitHub Issues To Asana Tasks
        uses: ideasonpurpose/github-issues-asana-tasks-action@v0.0.16
        env:
          ASANA_PAT: ${{ secrets.ASANA_PAT }}


```

`ASANA_PAT` is a Personal Access Token with access to your projects. 

## How it works

After adding the GitHub Action to a repository, two things are required for the action to do anything. The repository or organization must have an [Asana Personal Access Token](https://developers.asana.com/docs/personal-access-token) stored as a **GitHub Secret**, and the issue must include an [Asana Project Link](https://help.asana.com/hc/en-us/articles/14069807653147-Understanding-projects) in its Issue description.

- **On Issue Creation**<br>
  For newly created Issues, the Action will attempt to create a new Task in Asana, in the project linked in the description. New Tasks will appear in the first group (column/list) but can be moved anywhere in the project. The Issue description will be used to populate the task note, along with a link back to the Issue. (this link will be used later for updates and completions)

- **On Issue Updates (comments)**<br>
  For existing issues containing an Asana Project link, the Action will search the Project for a Task whose note contains the GitHub Issue permalink. If found, that Task will be updated with the new Issue comment.

- **On Issue Closed**<br>
  For existing issues containing an Asana Project link, the Action will search the Project for a Task whose note contains the GitHub Issue permalink. If found, that Task will be marked as completed.

### About Personal Access Tokens

API operations authenticated with Personal Access Tokens will assume the identity of the user who created the token. We recommend creating a bot account in your Asana workspace. Log in as the bot user and follow [Asana's documentation for creating a Personal Access Token](https://developers.asana.com/docs/personal-access-token).
